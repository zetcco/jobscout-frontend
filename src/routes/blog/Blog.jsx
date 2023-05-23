import { Stack } from "@mui/system"
import BlogPostSummary from "../../components/blog/BlogPostSummary"

function Blog() {
  return (
    <>
        <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
          <Stack spacing={3}>
            <BlogPostSummary/>
            <BlogPostSummary/>
          </Stack>
        </Stack>
    </>
  )
}
export default Blog