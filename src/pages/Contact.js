import React from 'react';
import { Panel, PanelGroup, Placeholder } from 'rsuite';

export function Contact () {
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
