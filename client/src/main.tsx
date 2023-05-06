import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './hooks/useAuth';
import { NotebooksProvider } from './hooks/useNotebooks';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
    <AuthProvider>
      <NotebooksProvider>
		<App />
	  </NotebooksProvider>
    </AuthProvider>
//   </React.StrictMode>,
)
