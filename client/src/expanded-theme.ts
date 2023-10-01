declare module "@mui/material/styles/createPalette" {
    interface PaletteColor {
        [key:number]:string

    }

    interface palette {
        teritary: PaletteColor
    }
}
