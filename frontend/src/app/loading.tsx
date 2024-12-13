import CachedIcon from '@mui/icons-material/Cached';
import { Container } from '@mui/material';

// auto-rendered whenever using the useSearchParams hook in the build phase
export default function Loading() {
    return (
        <Container maxWidth="xl">
            <CachedIcon /> Loading ...
        </Container>
    )
}