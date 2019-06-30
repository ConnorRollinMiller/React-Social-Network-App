const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Post = require('../../models/Posts');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    Create New Post
// @access  Private
router.post(
   '/',
   [
      auth,
      [
         check('text', 'Comment text is required.')
            .not()
            .isEmpty()
      ]
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array() });
      }

      try {
         const user = await User.findById(req.user.id).select('-password');

         if (!user) {
            res.status(400).json({ msg: 'No user was found.' });
         }

         const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
         });

         const post = await newPost.save();

         res.json(post);
      } catch (err) {
         console.error(err.message);
         res.status(500).send(`Server Error. ${err.message}`);
      }
   }
);

// @route   GET api/posts
// @desc    Get All Posts
// @access  Private
router.get('/', auth, async (req, res) => {
   try {
      const posts = await Post.find().sort({ date: -1 });

      res.json(posts);
   } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server Error. ${err.message}`);
   }
});

// @route   GET api/posts
// @desc    Get Post By Id
// @access  Private
router.get('/:post_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id);

      if (!post) {
         return res.status(404).json({ msg: 'Post not found.' });
      }

      res.json(post);
   } catch (err) {
      console.error(err.message);

      if (err.kind === 'ObjectId') {
         return res.status(404).send('Post not found.');
      }

      res.status(500).send(`Server Error. ${err.message}`);
   }
});

// @route   Delete api/posts
// @desc    Delete Post By ID
// @access  Private
router.delete('/:post_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id);

      if (!post) {
         return res.status(404).json({ msg: 'Post not found.' });
      }

      // Check is user owns this posts
      if (post.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User not authorized' });
      }

      await post.remove();

      res.json({ msg: 'Post deleted.' });
   } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server Error. ${err.message}`);
   }
});

// @route   Put api/posts/like/:post_id
// @desc    Like A Post
// @access  Private
router.put('/like/:post_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id);

      if (!post) {
         return res.status(404).json({ msg: 'Post not found.' });
      }

      // Check if user already liked this posts
      if (
         post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
      ) {
         return res.status(400).json({ msg: 'Post has already been liked.' });
      }

      post.likes.unshift({ user: req.user.id });

      await post.save();

      res.json(post.likes);
   } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server Error. ${err.message}`);
   }
});

// @route   Put api/posts/unlike/:post_id
// @desc    Unlike A Post
// @access  Private
router.put('/unlike/:post_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id);

      if (!post) {
         return res.status(404).json({ msg: 'Post not found.' });
      }

      // Check if user already liked this posts
      if (
         post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
      ) {
         return res.status(400).json({ msg: 'Post has not yet been liked.' });
      }

      const removeIndex = post.likes
         .map(like => like.user.toString())
         .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();

      res.json(post.likes);
   } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server Error. ${err.message}`);
   }
});

// @route   POST api/posts/comment/:post_id
// @desc    Create New Comment On A Post
// @access  Private
router.post(
   '/comment/:post_id',
   [
      auth,
      [
         check('text', 'Comment text is required.')
            .not()
            .isEmpty()
      ]
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array() });
      }

      try {
         const user = await User.findById(req.user.id).select('-password');
         const post = await Post.findById(req.params.post_id);

         if (!user) {
            res.status(400).json({ msg: 'No user was found.' });
         }
         if (!post) {
            res.status(400).json({ msg: 'No post was found.' });
         }

         const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
         };

         post.comments.unshift(newComment);

         await post.save();

         res.json(post.comments);
      } catch (err) {
         console.error(err.message);
         res.status(500).send(`Server Error. ${err.message}`);
      }
   }
);

// @route   Delete api/posts/comment/:post_id/:comment_id
// @desc    Delete Comment On A Post
// @access  Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
   try {
      const post = await Post.findById(req.params.post_id);

      if (!post) {
         return res.status(400).json({ msg: 'No post was found.' });
      }

      const comment = post.comments.find(
         comment => comment.id === req.params.comment_id
      );

      if (!comment) {
         return res.status(404).json({ msg: 'No comment was found.' });
      }

      if (comment.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: 'User is not authorized.' });
      }

      const removeIndex = post.comments
         .map(comment => comment.user.toString())
         .indexOf(req.user.id);

      post.comments.splice(removeIndex, 1);

      await post.save();

      res.json(post.comments);
   } catch (err) {
      console.error(err);
      console.error(err.message);
      res.status(500).send(`Server Error. ${err.message}`);
   }
});

module.exports = router;
