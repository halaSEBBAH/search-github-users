import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext(); 

const GithubProvider  = ({children}) => {

    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [loading, setIsLoading] = useState(false);
    const [error,setError] =  useState({show:false,msg:""})

    const checkRequests = () =>{
        axios(`${rootUrl}/rate_limit`)
        .then(({data}) => {
            let {
                rate:{remaining},
            } = data;
            setRequests(remaining);
            if(remaining == 0){
                toggleError(true,'sorry, you have exceed your hourly rate limit !')
                
            }
        })
        .catch((err) =>console.log(err));
    };

    function toggleError({show, msg}){
        setError({show,msg});
    }

    
    useEffect( checkRequests,[]);

    //const [followers, setFollowers] = useState(mockFollowers);
    

    return (
        <GithubContext.Provider value={{githubUser,repos,followers,requests}}>
            {children}
        </GithubContext.Provider>

    );

}

export {GithubProvider, GithubContext};