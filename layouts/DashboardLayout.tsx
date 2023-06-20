import { ReactNode } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "@/components/dashboardNav/Navbar";
import SidebarNavigation from "@/components/dashboardNav/SidebarNavigation";
import { DashboardContainer } from "@/components/container";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />

      <DashboardContainer>
        <Grid
          gridTemplateColumns={'repeat(12, 1fr)'}
          gap={5}
          py={10}
        >
          <GridItem
            display={{ base: "none", md: "block" }}
            colSpan={{
              base: 12,
              md: 2
            }}
          >
            <SidebarNavigation />
          </GridItem>
          <GridItem
            colSpan={{
              base: 12,
              md: 10
            }}
          >
            {children}
          </GridItem>
        </Grid>
      </DashboardContainer>
    </>
  )
}


export const DashboardLayoutWithoutSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />

      <DashboardContainer>
        {children}
      </DashboardContainer>
    </>
  )
}
