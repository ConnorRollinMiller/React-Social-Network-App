import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';

import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
   useEffect(() => {
      getGithubRepos(username);
   }, [getGithubRepos, username]);
   return (
      <div className='pt-4'>
         <h2 className='mb-4'>GitHub Repos</h2>
         {repos === null ? (
            <Spinner />
         ) : (
            repos.map(repo => (
               <div
                  key={repo.id}
                  className='d-flex align-items-center border p-4 mb-2'
               >
                  <div>
                     <h4>
                        <a
                           href={repo.html_url}
                           target='_blank'
                           rel='noopener noreferrer'
                        >
                           {repo.name}
                        </a>
                     </h4>
                     <p className='mb-0'>{repo.description}</p>
                  </div>
                  <ul className='ml-auto mb-0 d-flex flex-column align-items-stretch'>
                     <li className='col badge badge-primary mr-2 mb-2'>
                        Stars: {repo.stargazers_count}
                     </li>
                     <li className='col badge badge-dark mr-2 mb-2'>
                        Watchers: {repo.watchers_count}
                     </li>
                     <li className='col badge badge-info'>
                        Forks: {repo.forks_count}
                     </li>
                  </ul>
               </div>
            ))
         )}
      </div>
   );
};

ProfileGithub.propTypes = {
   getGithubRepos: PropTypes.func.isRequired,
   repos: PropTypes.array.isRequired,
   username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
   repos: state.profile.repos
});

export default connect(
   mapStateToProps,
   { getGithubRepos }
)(ProfileGithub);
