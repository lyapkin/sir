import { colors, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    tableHead: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    tableHead?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    tableHead: true;
  }
}

const theme = createTheme({
  components: {
    // MuiTypography: {
    //   styleOverrides: {
    //     gutterBottom: ({ theme }) => ({
    //       marginBottom: theme.spacing(3),
    //     }),
    //   },
    // },
    // MuiAppBar: {
    //   styleOverrides: {
    //     colorPrimary: {
    //       backgroundColor: colors.cyan[800],
    //     },
    //   },
    // },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            fontStyle: "italic",
          },
          "& .MuiInputLabel-shrink": {
            display: "none",
          },
          // Root class for the input field
          "& .MuiOutlinedInput-root": {
            background: "#F2F2F2",

            // Class for the border around the input field
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: colors.blue[500],
    },
  },
  typography: {
    tableHead: {
      fontSize: "0.875rem",
      fontWeight: 600,
    },
  },
});

export default theme;
