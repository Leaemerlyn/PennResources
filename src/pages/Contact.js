import React from 'react';
import { Panel, PanelGroup, useToaster } from 'rsuite';

export function Contact () {
    const toaster = useToaster();
    toaster.clear();

    return (
        <>
          <h3>
          Contact the Team 
          </h3>
          <PanelGroup>
            <Panel header="Lea Emerlyn">
              <p>
                lemerlyn@seas.upenn.edu
              </p>
            </Panel>
            <Panel header="Leven Cai">
              <p>
                levencai@seas.upenn.edu
              </p>
              <p>
                I joined MCIT in Spring 2023 to transition from teaching to tech. I'm still exploring which field of computer programming to 
                pursue, but I'm leaning towards data science due to my background in biological research. I live in NYC and plan to stay here for 
                as long as I live. Gotta love the dirty subway, the city parks, and the food. 
              </p>
            </Panel>
            <Panel header="Abdullah Amer">
                <p>
                  abdamer@seas.upenn.edu
                </p> 
            </Panel>
            <Panel header="Ben Swanson">
              <p>
              I joined MCIT in Fall 2022 after studying economics in undergrad, and I hope to transition from 
              my work in consulting to softwarre engeineering. I'm originally from Philly and I now  
              live in NYC. Feel free to reach out at bswan1@seas.upenn.edu, and thanks for using Penn Resources!
              </p>
            </Panel>
          </PanelGroup>
        </>
    )
}
