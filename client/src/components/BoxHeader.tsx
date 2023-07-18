import React from "react"
import FlexBetween from './FlexBetween';
import { useTheme, Box, Typography} from "@mui/material"

type Props= {
    icon?:React.ReactNode;
    title: string;
    subtitle?:string;
    sideText?:string;
}

const BoxHeader = ({icon, title, subtitle,sideText}: Props) => {

    const {palette} = useTheme()

    return (
        <FlexBetween margin="1.5rem 1rem 0 1rem"  color={palette.grey[200]}>
            <FlexBetween >
                {icon}
                <Box width="100%">
                    <Typography>
                        {title}
                    </Typography>
                    <Typography variant="h5" color={palette.grey[500]}>
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <Typography variant="h5" fontWeight="700" color={palette.secondary[300]}>
                {sideText}
            </Typography>
        </FlexBetween>
    )
}

export default BoxHeader