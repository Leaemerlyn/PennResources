import { Button, SelectPicker } from 'rsuite';
import { ContributionCard } from '../components/ContributionCard';
import { courseOptions, moduleOptions } from '../util';
import { NoResource } from './NoResource';

export function ContributionList ({setSelectedModule, setSelectedCourse, setResourceIdToEdit, selectedCourse, selectedModule, contributionsList, getContributions, setAddingResource}) {

    const handleCourseFilter = (value) => {
        setSelectedCourse(value);
    };
    
    const handleModuleFilter = (value) => {
        setSelectedModule(value);
    };
    
    const handleOpenEditPage = (resourceId) => {
        setResourceIdToEdit(resourceId);
    }

    return (
        <>
        <h4>Here are all your contributions to Penn Resources</h4>
            <div>
            <div className="filterContainer">
                <SelectPicker
                    data={courseOptions}
                    value={selectedCourse}
                    onChange={handleCourseFilter}
                    placeholder="Select"
                    className="filterInput"
                />
                <SelectPicker
                    data={moduleOptions}
                    value={selectedModule}
                    onChange={handleModuleFilter}
                    placeholder="Select"
                    className="filterInput"
                />
            </div>
            <div id="contributionListContainer"> 
                {contributionsList.map((contribution) => (
                <ContributionCard
                    key={contribution.id}
                    getContributions={getContributions}
                    course={contribution.Course}
                    module={contribution.Module}
                    link={contribution.Link}
                    description={contribution.Description}
                    title={contribution.Title}
                    showName={contribution.ShowName}
                    type={contribution.Type}
                    docID={contribution.id}
                    openEditPage={()=> handleOpenEditPage(contribution.id)}
                />
                ))}
            </div>
            {contributionsList.length===0 ? <NoResource/> : <></>}
        </div>

        <Button
            appearance="ghost"
            className="addResource"
            onClick={() => setAddingResource(true)}
        > Add Resources </Button>
        </> 


    )
}