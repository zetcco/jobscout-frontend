import { Stack } from "@mui/system"
import BlogPostSummary from "../../components/blog/BlogPostSummary"
import SmallPanel from "../../components/SmallPanel"

function Blog() {
  return (
    <>
        <Stack direction="colomn" justifyContent="space-between" alignItems="flex-start" spacing={5}>
            <SmallPanel 
              mainTitle={'Left'}
              children = {[
                <button variant = {'outlined'} fullWidth>Left Button</button>
              ]}
            />
          <Stack spacing={3}>
            <BlogPostSummary/>
            <BlogPostSummary/>
          </Stack>
          <SmallPanel 
             mainTitle={'Right'} 
             children = {[
              <button variant = {'outlined'} fullWidth>Right Button</button>
            ]}
          />
        </Stack>
    </>
  )
}
export default Blog