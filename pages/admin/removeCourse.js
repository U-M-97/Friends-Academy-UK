import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";

const RemoveCourse = () => {
  return (
     <ThemeProvider theme={theme}>
        <FullLayout>
            Remove Courses
        </FullLayout>
    </ThemeProvider>
  )
}

export default RemoveCourse