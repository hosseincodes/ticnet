import tinycolor from "tinycolor2";

const primary = "#34495E";
const secondary = "#C0392B";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";

const lightenRate = 7.5;
const darkenRate = 15;

export default {
  direction: 'rtl',
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: "#FFFFFF",
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      primary: "#4A4A4A",
      secondary: "#6E6E6E",
      hint: "#B9B9B9",
    },
    background: {
      default: "#F6F7FF",
      light: "#F3F5FF",
    },
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "#4A4A4A1A",
      },
    },
    MUIDataTableBodyRow: {
      responsiveStacked: {
        '@media (max-width: 959.95px)': {
          border: 'none !important',
        },
      },
      root: {
        cursor: 'pointer !important',
      },
      actions: {
        display: 'none',
      },
      icon: {
        display: 'none',
      },
    },
    MUIDataTableHead: {
      responsiveStacked: {
        '@media (max-width: 959.95px)': {
          display: 'table-header-group !important',
        },
      },
    },
    MUIDataTableBodyCell: {
      root: {
        textAlign: 'right',
        fontFamily: 'Shabnam',
      },
      responsiveStacked: {
        '@media (max-width: 959.95px)': {
          height: 'auto',
          width: 'auto',
          fontSize: '16px',
          display: 'table-cell',
          whiteSpace: 'normal',
        },
      },
      cellStacked: {
        '@media (max-width: 959.95px)': {
          height: 'auto',
          width: 'auto',
          display: 'none',
          fontSize: '16px',
          whiteSpace: 'normal',
        },
      },
    },
    MuiInputLabel: {
      formControl: {
        fontFamily: 'Shabnam',
        right: 0,
        left: 'auto',
        width : '16rem'
      },
    },
    MuiSvgIcon: {
      root: {
        left: 0,
        right: 'auto !important',
      },
    },
    MUIDataTable: {
      root : {
      },
      caption: {
        display: 'none',
      },
      paper: {
        borderRadius: 17
      }
    },
    MuiButtonBase: {
      root: {
        fontFamily: 'Shabnam !important',
      },
    },
    MuiTypography: {
      root: {
        fontFamily: 'Shabnam !important',
      },
    },
    MuiTablePagination: {
      selectIcon: {
        right: '0 !important',
      },
    },
    MuiMenuItem: {
      root: {
        fontFamily: 'Shabnam !important',
      },
    },
    MuiInputBase: {
      input: {
        fontFamily: 'Shabnam !important',
      },
    },
    Toastify__toast: {
      root: {
        fontFamily: 'Shabnam !important',
      },
    },
    MUIDataTableHeadCell: {
      root: {
        textAlign: 'right',
        fontFamily: 'Shabnam',
      },
    },
    MUIDataTableSelectCell: {
      fixedHeader: {
        display: 'none',
      },
    },
    MUIDataTableToolbar: {
      actions: {
        textAlign: 'left',
      },
      root: {
        borderRadius: '17px 17px 0 0',
        backgroundColor: primary
      }
      , titleText: {
        color: 'white'
      }
      , icon: {
        color: 'white'
      }
    },
    MuiMenu: {
      paper: {
        boxShadow:
          "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
      },
    },
    MuiSelect: {
      icon: {
        color: "#B9B9B9",
      },
    },
    MuiListItemText: {
      root : {
      display:'flex',
      }
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#F3F5FF !important",
          "&:focus": {
            backgroundColor: "#F3F5FF",
          },
        },
      },
      button: {
        "&:hover, &:focus": {
          backgroundColor: "#F3F5FF",
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: "white",
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiDivider: {
      root: {
        marginTop: '16px',
        marginBottom: '16px',
      },
    },
    MuiPrivateTextarea: {root: {height: '100%'}},
    MuiTableCell: {
      root: {
        borderBottom: "1px solid rgba(224, 224, 224, .5)",
      },
      head: {
        fontSize: "0.95rem",
      },
      body: {
        fontSize: "0.95rem",
      },
    },
  },
};
