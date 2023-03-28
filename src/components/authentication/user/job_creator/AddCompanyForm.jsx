import { Button, TextField, Box, InputAdornment, Autocomplete, Typography, Avatar, Alert, AlertTitle } from '@mui/material'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { CenteredHeaderCard } from '../../../cards/CenteredHeaderCard'
import SearchIcon from '@mui/icons-material/Search';
import { RouterLink } from '../../../RouterLink';
import axios from "axios"
import { AvatarWithInitials } from 'components/AvatarWithInitials';
import { CardWithCloseButton } from 'components/CardWithCloseButton';
import { useSelector } from 'react-redux';
import { selectAuthUserToken } from 'features/authSlice';
import { useNavigate } from 'react-router-dom';

const AddCompanyForm = () => {

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [fetchOrgsLoading, setFetchOrgsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [submitOrgLoading, setSubmitOrgsLoading] = useState(false);

  const authToken = useSelector(selectAuthUserToken);

  const navigate = useNavigate();

  // Request for setting an organization
  const setOrganization = () => {
    /* TODO: Move this function to somewhere more appropiate, maybe an Hook? */
    const setOrganizationReq = async (organizationId) => {
      setSubmitOrgsLoading(true);
      axios.post(`/jobcreator/request-organization`,
        { id: organizationId },
        { headers: { "Authorization": `Bearer ${authToken}` }}
      ).then((response) => {
        setSubmitOrgsLoading(false);
        navigate("/signup/user/dp")
      }).catch((error) => {
        setError(error.response.data)
        setSubmitOrgsLoading(false);
      })
    }
    setOrganizationReq(value.id)
  }

  // Fetch companies by searching
  useEffect(() => {
    if (inputValue !== '') {
      axios.get(`/organization/search?q=${inputValue}&limit=10&offset=0`)
      .then((response) => {
        setOptions(response.data)
        setFetchOrgsLoading(false)
      }).catch((error) => {
        console.log(error)
        setFetchOrgsLoading(false)
      })
    }
  }, [inputValue])

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    
      <CenteredHeaderCard title={" Add Your Company"}>
      <Stack spacing={4} sx={{ width: '100%' }}>
        {
            error && 
            (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>{error.message}</strong>
                </Alert>
            )
        }
        <Autocomplete
          value={value}
          inputValue={inputValue}
          onChange={(e, value) => { setValue(value) }}
          onInputChange={(e, value) => { setInputValue(value) }}
          loading={fetchOrgsLoading}
          filterOptions={(x) => x}
          options={options}
          getOptionLabel={(option) => typeof option === 'string' ? option : option.displayName }
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => 
            <TextField 
              {...params}
              label="Search Your Company"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                    {params.InputProps.startAdornment}
                  </InputAdornment>
                ),
              }}
            />
          }
          renderOption={(props, option) => {
              return (
                <li {...props}>
                  <Stack direction={"row"} spacing={1}>
                    {
                        option.displayPicture ? (
                            <Avatar src={option.displayPicture} sx={{ width: 24, height: 24 }}/>
                        ) : (
                            <Avatar sx={{ width: 24, height: 24 }}>{ option.displayName && (Array.from(option.displayName)[0]) }</Avatar>
                        )
                    }
                    <Typography>{option.displayName}</Typography>
                  </Stack>
                </li>
              )
          }}
        />

        {
          value && (
            <CardWithCloseButton onClose={() => setValue(null)}>
              <Stack direction={"row"} alignItems="center" spacing={2}>
                <AvatarWithInitials src={value.displayPicture} name={value.displayName} size={124}/>
                <Stack direction={"column"}>
                  <Typography variant='profile_name'>{value.displayName}</Typography>
                  <Typography variant='h6'>{value.email}</Typography>
                  <Typography variant='subtitle1'>{value.address?.city + ", " + value.address?.province + ", " + value.address?.country}</Typography>
                </Stack>
              </Stack>
            </CardWithCloseButton>
          )
        }          
        <Stack direction="row" spacing={2}>
          <Box sx={{ width: '100%' }}>
            <RouterLink to="/signup/user/dp">
              <Button variant='outlined' sx={{ width: '100%' }}>Skip</Button>
            </RouterLink>
          </Box>
          <Box sx={{ width: '100%' }}>
            <RouterLink to="/signup/organization/account">
              <Button variant='outlined' sx={{ width: '100%' }}>Create Your Company</Button>
            </RouterLink>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Button variant='contained' sx={{ width: '100%' }} onClick={setOrganization} disabled={submitOrgLoading || value == null}>Continue</Button>
          </Box>
          </Stack>     
      </Stack>
        
      </CenteredHeaderCard>
    
    </Stack>
  )
}


export default AddCompanyForm
