import React from "react";
import { Typography , Stack} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BasicCard } from "./BasicCard";

const SmallPanel = () => {
    return ( 
        <BasicCard>
            <Stack direction={'column'} spacing={2}>
                <Stack>
                    <Typography variant='h5'>Title</Typography>
                </Stack>
                <Stack direction={'column'} spacing={4}>
                                <FormControl sx = {{s:1, minWidth:'230px'}}>
                                    <InputLabel id="Small-panel-filter-by-fields-label">Filter by fields</InputLabel>
                                    <Select
                                        labelId="Small-panel-filter-by-fields-label"
                                        id="Small-panel-filter-by-fields"
                                        label="Fileds"      
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx = {{s:1, minWidth:'230px'}}>
                                    <InputLabel id="Small-panel-filter-by-skills-label">Filter by skills</InputLabel>
                                    <Select
                                        labelId="Org-registration-city-select-label"
                                        id="Org-registration-city-select"
                                        label="City"
    
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx = {{s:1, minWidth:'230px'}}>
                                    <InputLabel id="Small-panel-filter-by-location-label">Filter by location</InputLabel>
                                    <Select
                                        labelId="Org-registration-city-select-label"
                                        id="Org-registration-city-select"
                                        label="City"
                                 >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                            </FormControl>
                </Stack>
            </Stack>
        </BasicCard>
     );
}
 
export default SmallPanel;