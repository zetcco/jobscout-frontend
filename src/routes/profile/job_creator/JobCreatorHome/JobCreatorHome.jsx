import React from 'react';
import { BasicCard } from '../../../../components/cards/BasicCard';
import { Stack } from '@mui/system';
import SmallPanel from '../../../../components/SmallPanel';
import { Grid, Typography } from '@mui/material';
import { JobCreatorHomeCards } from './JobCreatorHomeCards';
import { SelectableCard } from '../../../../components/cards/SelectableCard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkIcon from '@mui/icons-material/Work';
import { RouterLink } from '../../../../components/RouterLink';

export const JobCreatorHome = () => {
  return (
    <Stack direction={'column'} spacing={4}>
      <Stack>
        <SmallPanel mainTitle={'Actions'}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <RouterLink to={'/posts/create'}>
                <SelectableCard
                  title={
                    <Stack
                      direction={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      spacing={1}
                    >
                      <AddBoxIcon sx={{ height: '30px', width: '30px' }} />
                      <Typography variant='h6'>CREATE</Typography>
                    </Stack>
                  }
                />
              </RouterLink>
            </Grid>
            <Grid item xs={4}>
              <RouterLink to={'/posts/1/manage'}>
                <SelectableCard
                  title={
                    <Stack
                      direction={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      spacing={1}
                    >
                      <ManageAccountsIcon
                        sx={{ height: '30px', width: '30px' }}
                      />
                      <Typography variant='h6'>MANAGE</Typography>
                    </Stack>
                  }
                />
              </RouterLink>
            </Grid>
            <Grid item xs={4}>
              <SelectableCard
                title={
                  <Stack
                    direction={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    spacing={1}
                  >
                    <WorkIcon sx={{ height: '30px', width: '30px' }} />
                    <Typography variant='h6'>VACCANCIES</Typography>
                  </Stack>
                }
              />
            </Grid>
          </Grid>
        </SmallPanel>
      </Stack>

      <Stack direction={'row'} spacing={2}>
        <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
          <Grid item xs={12} md={4}>
            <Stack flexGrow={1}>
              <JobCreatorHomeCards
                title={'POSTS'}
                subtitle={'No of job posts'}
                count={6}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack flexGrow={1}>
              <JobCreatorHomeCards
                title={'ACTIVATED POSTS'}
                subtitle={'No of activated posts'}
                count={10}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack flexGrow={1}>
              <JobCreatorHomeCards
                title={'DEACTIVATED POSTS'}
                subtitle={'No of deactivated posts'}
                count={2}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};
