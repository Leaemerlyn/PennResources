//import Link from "react-dom";
import './Welcome.css'
import React from 'react';
// import './styles.css';

import { Panel, PanelGroup } from 'rsuite';

export function Welcome () {
    return (
        <>
          <h3>
          Welcome to Penn Resources 
          </h3>
            <PanelGroup>
          <Panel header="Navigation">
            <p>
            Select a course and a module to find supplemental resources
            to help strengthen your understanding of course material
            </p>
          </Panel>
          <Panel header="Adding a Resource">
            <p>
            To help other students, please add resources that helped you learn course material.
            These can include YouTube videos, articles, textbooks, or anything else that you found online that made course material easier to understand.
              </p>
          </Panel>
          <Panel header="Academic Integrity">
            <p>
            Be aware of what you’re posting and reading and make sure that it doesn’t violate any MCIT academic policies. Thank you for contributing!
            </p>
          </Panel>
        </PanelGroup>
        </>
    )
}
