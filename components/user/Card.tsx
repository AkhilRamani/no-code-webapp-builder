// components/user/Card.js
import React  from "react";
import {
    Card as ShadcnCard,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {Button} from "@/components/ui/button"

export const Card = () => {
    return (
        <ShadcnCard className="w-[350px]">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter>
                <Button className="w-full">
                Done</Button>
      </CardFooter>
        </ShadcnCard>

    )
}