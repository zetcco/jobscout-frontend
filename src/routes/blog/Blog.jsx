import { Stack } from "@mui/system"
import BlogPostSummary from "../../components/blog/BlogPostSummary"
import SmallPanel from "../../components/SmallPanel"

function Blog() {
  return (
    <>
        <Stack direction="colomn" justifyContent="space-between" alignItems="stretch" spacing={4}>
            <SmallPanel 
              mainTitle={'Left'}
            />
          <Stack><BlogPostSummary/></Stack>
          <SmallPanel 
             mainTitle={'Right'} 
          />
        </Stack>
    </>
  )
}
export default Blog