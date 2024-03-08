import {
    Route,
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
} from "react-router-dom";

import Main from "./routes/Main";
import Details from "./routes/Details";
import detailsLoader from "./routes/detailsUtils.ts";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Main />}/>
            <Route path="/:id/details" element={<Details />} loader={detailsLoader}/>
        </>
    )
);

const App = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;