import React from 'react';
import "./Contact.css"
import { Panel, useToaster } from 'rsuite';
import { useEffect } from 'react';
import { popUpKey } from '../popUpKey';

export function Contact ( page ) {
    const toaster = useToaster();

    useEffect(() => {
      const removePopUp = () => {
        if (popUpKey.has("delete")) {
          toaster.remove(popUpKey.get("delete"));
        }
      };
  
      removePopUp();
    }, [page])

    return (
        <div id="contact-container">
          <h4 id="contact-header">
          Contact the Team 
          </h4>
          <div id="contact-card-group">
            <Panel header="Lea Emerlyn" bordered>
                <p>
                  lemerlyn@seas.upenn.edu
                </p>
                <p>
                  Thanks for visiting the page! I currently work as a creative technologist building full stack web apps for UX Designers. I studied Human-Computer Interaction and Media Design at Carnegie Mellon. I'm grew up in NYC and love it here in the east coast. 
                </p>
            </Panel>
            <Panel header="Leven Cai" bordered>
              <p>
                levencai@seas.upenn.edu
              </p>
              <p>
                I joined MCIT in Spring 2023 to transition from teaching to tech. I'm still exploring which field of computer programming to 
                pursue, but I'm leaning towards data science due to my background in biological research. I live in NYC and plan to stay here for 
                as long as I live. Gotta love the dirty subway, the city parks, and the food. 
              </p>
            </Panel>
            <Panel header="Abdullah Amer" bordered>
                <p>
                  abdamer@seas.upenn.edu 
                </p> 
                <p>
                Hi everyone, thanks for checking out the site and contributing! I am a local new yorker and 
                  I am going into my 3rd semester of MCIT. I am an aspiring software engineer.
                </p>
            </Panel>
            <Panel header="Ben Swanson" bordered>
              <p>
              I joined MCIT in Fall 2022 after studying economics in undergrad, and I hope to transition from 
              my work in consulting to software engeineering. I'm originally from Philly and I now  
              live in NYC. Feel free to reach out at bswan1@seas.upenn.edu, and thanks for using Penn Resources!
              </p>
            </Panel>
          </div>
        </div>
    )
}
