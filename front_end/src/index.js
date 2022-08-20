import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Master from './Master';

import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'

// 사용중인 디바이스 터치 사용여부 확인
function is_touch_device() {
  try {
    document.createEvent("TouchEvent");
    console.log('touch')
    return true;
  } catch (e) {
    console.log('none touch')
    return false;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DndProvider  backend={is_touch_device() ? TouchBackend : HTML5Backend}>
      <Master />
    </DndProvider>
  </React.StrictMode>
);
