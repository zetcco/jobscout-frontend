import { Stack } from "@mui/system"
import {Button } from '@mui/material'
import BlogPostSummary from "../../components/blog/BlogPostSummary"
import SmallPanel from "../../components/SmallPanel"

function Blog() {
  return (
    <>
        <Stack direction="colomn" justifyContent="space-between" alignItems="flex-start" spacing={5}>
            <SmallPanel 
              mainTitle={'Left'}
              children = {[
                <Button variant = {'outlined'} fullWidth>Left Button</Button>
              ]}
            />
          <Stack spacing={3}>
            <BlogPostSummary/>
            <BlogPostSummary/>
          </Stack>
          <SmallPanel 
             mainTitle={'Right'} 
             children = {[
              <Button variant = {'outlined'} fullWidth>Right Button</Button>
            ]}
          />
        </Stack>
    </>
  )
}
export default Blog