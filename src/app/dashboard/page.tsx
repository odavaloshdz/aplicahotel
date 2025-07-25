"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Bed,
  Building,
  Calendar as CalendarIcon,
  CreditCard,
  Home,
  Hotel,
  Percent,
  PieChart,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  // Mock data for dashboard statistics
  const stats = [
    {
      title: "Total Reservations",
      value: "124",
      icon: <CalendarIcon className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Available Rooms",
      value: "28",
      icon: <Bed className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Occupied Rooms",
      value: "34",
      icon: <Hotel className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Revenue",
      value: "$12,450",
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  // Mock data for recent reservations
  const recentReservations = [
    {
      id: "RES-001",
      client: "Agustín Barboa Rangel",
      room: "101",
      checkIn: "2023-05-15",
      checkOut: "2023-05-18",
      status: "Checked In",
    },
    {
      id: "RES-002",
      client: "Adelina Pasero",
      room: "203",
      checkIn: "2023-05-16",
      checkOut: "2023-05-20",
      status: "Reserved",
    },
    {
      id: "RES-003",
      client: "Albertano Sanches",
      room: "105",
      checkIn: "2023-05-17",
      checkOut: "2023-05-19",
      status: "Checked Out",
    },
    {
      id: "RES-004",
      client: "Alejandra Ciego Piedra",
      room: "302",
      checkIn: "2023-05-18",
      checkOut: "2023-05-21",
      status: "Reserved",
    },
  ];

  // Mock data for room availability
  const roomAvailability = [
    { type: "Double", total: 20, available: 12, occupied: 8 },
    { type: "Matrimonial", total: 15, available: 7, occupied: 8 },
    { type: "Suite", total: 10, available: 5, occupied: 5 },
    { type: "Single", total: 25, available: 15, occupied: 10 },
  ];

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input placeholder="Search..." className="w-64 pl-8" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              New Reservation
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Reservations</span>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{reservation.client}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Room {reservation.room}</span>
                        <span>•</span>
                        <span>
                          {reservation.checkIn} to {reservation.checkOut}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        reservation.status === "Checked In"
                          ? "default"
                          : reservation.status === "Reserved"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {reservation.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Room Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roomAvailability.map((room, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{room.type}</span>
                      <span className="text-sm text-muted-foreground">
                        {room.available} of {room.total} available
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${(room.occupied / room.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card className="bg-white col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <PieChart className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Revenue chart visualization would appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar className="rounded-md border" />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Properties Overview</span>
                <Button variant="outline" size="sm">
                  Manage Properties
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Hotel Presidente</h3>
                  </div>
                  <Separator className="my-3" />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Rooms</p>
                      <p className="font-medium">45</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Occupancy</p>
                      <p className="font-medium">78%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium">$8,450</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reservations</p>
                      <p className="font-medium">32</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Hotel Playa Azul</h3>
                  </div>
                  <Separator className="my-3" />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Rooms</p>
                      <p className="font-medium">32</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Occupancy</p>
                      <p className="font-medium">65%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium">$5,280</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reservations</p>
                      <p className="font-medium">24</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-medium">Hotel Montaña</h3>
                  </div>
                  <Separator className="my-3" />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Rooms</p>
                      <p className="font-medium">28</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Occupancy</p>
                      <p className="font-medium">82%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium">$4,120</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reservations</p>
                      <p className="font-medium">18</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
