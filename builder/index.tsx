"use client"

import React from 'react';
import { Toolbox } from '../components/Toolbox';
import { SettingsPanel } from '../components/SettingsPanel';
import { Topbar } from '../components/Topbar';
import { Container } from '../components/user/Container';
import { Button } from '../components/user/Button';
import { Text } from '../components/user/Text';
import { Card } from '../components/user/Card';
import {Editor, Frame, Element} from "@craftjs/core";

export default function Builder() {
  return (
    <Editor resolver={{Card, Button, Text, Container}}> 
    <div className='h-full'>
      <Topbar />
      <div className="flex w-full h-full">
        <Toolbox />

          <Frame>
            <Element is={Container} padding={5} background="#eee" canvas>
              <Card />
              <Button>Button</Button>
              <Text text="Hi world!" fontSize='20px' />
              <Element is={Container} padding={2} background="#999" canvas>
                <Text text="It's me again!" fontSize='20px' />
              </Element>
            </Element>
            {/* <Container background="#eee">
              <Card />
            </Container> */}
          </Frame>

          <div className="bg-white rounded-lg shadow-md h-full">
            <SettingsPanel />
          </div>
      </div>
    </div>
    </Editor>
  );
}