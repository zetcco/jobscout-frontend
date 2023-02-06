import { Stack } from "@mui/system"
import {Button } from '@mui/material'
import BlogPostSummary from "../../components/blog/BlogPostSummary"
import SmallPanel from "../../components/SmallPanel"
import {Button } from '@mui/material'

function Blog() {
  return (
    <>
        <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
            <SmallPanel
            children = {[
                <Button variant = {'outlined'} fullWidth>Left Button</Button>
              ]}
            />
          <Stack spacing={3}>
            <BlogPostSummary/>
            <BlogPostSummary/>
          </Stack>
          <SmallPanel 
             children = {[
              <Button variant = {'outlined'} fullWidth>Right Button</Button>
            ]}
          />
        </Stack>
    </>
  )
}
export default Blog