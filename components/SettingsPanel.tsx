import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge} from "@/components/ui/badge"
import { Form} from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"

export const SettingsPanel = () => {
  return  (    
    <Card className="bg-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Selected</CardTitle>
        <Badge className="bg-blue-500 text-white" variant="default">Selected</Badge>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
            <Slider defaultValue={[33]} max={100} step={1} />
        </div>


        {/* <Form >
          <FormLabel>Prop</FormLabel>
          <Slider
            defaultValue={0}
            step={1}
            min={7}
            max={50} 
          />
        </Form> */}
        <Button variant="destructive" className="w-full mt-4">
          Delete
        </Button>
      </CardContent>
    </Card>
  ) 
}