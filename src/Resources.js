import { CheckPicker } from 'rsuite';

const courseData = ["591", "592", "593", "594"].map(item =>({label: item, value: item}));
const moduleData = ["General", "Module 1", "Module 2", "Module 3"].map(item =>({label: item, value: item}));

export function Resources() {
    return(
        <>
            <CheckPicker data={courseData}/>
            <CheckPicker data={moduleData}/>
        </>
    )
}