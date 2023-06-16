import './Welcome.css'
import React from 'react';
import { RadioTile, RadioTileGroup } from 'rsuite';
import { Icon } from '@rsuite/icons';
import SearchIcon from '@rsuite/icons/Search';
import SendIcon from '@rsuite/icons/Send';

export function Welcome () {
    return (
        <p> hi</p>
        // <>
        //     <h3>
        //     Welcome to Penn Resources 
        //     </h3>
        //     <RadioTileGroup defaultValue="title">
        //         <RadioTile icon={<Icon as={SearchIcon} />} label="Navtigation">
        //         Select a course and a module to find supplemental resources to help strengthen your understanding of course material
        //         </RadioTile>
        //         <RadioTile icon={<Icon as={SendIcon} />} label="Adding a Resource">
        //         To help other students, please add resources that helped you learn course material.
        //         These can include YouTube videos, articles, textbooks, or anything else that you found online that made course material easier to understand.
        //         </RadioTile>
        //         <RadioTile icon={<Icon as={VscRepo} />} label="Academic Integrity">
        //         Be aware of what you’re posting and reading and make sure that it doesn’t violate any MCIT academic policies. Thank you for contributing!
        //         </RadioTile>
        //     </RadioTileGroup>
        // </>
    )
}
