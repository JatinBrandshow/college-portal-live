'use client';

import React from 'react';
import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import ProgramsSection from '@/components/ProgramsSection';
import EventsSection from '@/components/EventsSection';
import Achievements from '@/components/Achievements';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import LogoSlider from '@/components/LogoSlider';
import StudyGoal from '@/components/StudyGoal';
import PropertyType from '@/components/PropertyType';
import BudgetProperties from '@/components/BudgetProperties';
import PopularCities from '@/components/PopularCities';
import PopularColleges from '@/components/PopularColleges';
import Hero from '@/components/Hero';
import Usp from '@/components/Usp';
import OurTestimonial from '@/components/OurTestimonial';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      {/* <AboutSection /> */}
      <PopularCities />
      <PopularColleges />
      <Usp />
      <BudgetProperties />
      <PropertyType />
      <StudyGoal />
      <OurTestimonial />
      {/* <Banner />
      <EventsSection />
      <LogoSlider />
      <Achievements /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
