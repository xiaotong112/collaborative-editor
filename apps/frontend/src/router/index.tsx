import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { DocumentEditor } from '../pages/DocumentEditor/index';
import { Login } from '../pages/Login';
import { WhiteboardEditor } from '../pages/WhiteboardEditor/index';
import { Workspace } from '../pages/Workspace';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/workspace',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Workspace />,
      },
    ],
  },
  {
    path: '/document/:id',
    element: <DocumentEditor />,
  },
  {
    path: '/whiteboard/:id',
    element: <WhiteboardEditor />,
  },
]);
