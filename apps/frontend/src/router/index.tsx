import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Layout } from '../components/Layout';
import { Workspace } from '../pages/Workspace';
import { DocumentEditor } from '../pages/DocumentEditor/index';
import { WhiteboardEditor } from '../pages/WhiteboardEditor';

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
