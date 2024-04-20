import { Box } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import EventReportMaker from './EventReportMaker';
import PageBase from './PageBase';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageBase><EventReportMaker /></PageBase>,
    }
]);

function App() {
    return (
        <Box w="100vw">
            <RouterProvider router={router} />
        </Box>
    );
}

export default App
