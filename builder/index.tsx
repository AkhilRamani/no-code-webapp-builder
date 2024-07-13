import React from 'react';
import { Toolbox } from '../components/Toolbox';
import { SettingsPanel } from '../components/SettingsPanel';
import { Topbar } from '../components/Topbar';
import { Container } from '../components/user/Container';
import { Card } from '../components/user/Card';

export default function Builder() {
  return (
    <div className='h-full'>
      <Topbar />
      <div className="flex w-full h-full">
        <Toolbox />

          <Container background="#eee">
            <Card />
          </Container>

          <div className="bg-white rounded-lg shadow-md h-full">
            <SettingsPanel />
          </div>
      </div>
    </div>
  );
}