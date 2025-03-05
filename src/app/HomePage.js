'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PopularCities from '@/components/PopularCities';
import PopularColleges from '@/components/PopularColleges';
import Usp from '@/components/Usp';
import BudgetProperties from '@/components/BudgetProperties';
import PropertyType from '@/components/PropertyType';
import StudyGoal from '@/components/StudyGoal';
import OurTestimonial from '@/components/OurTestimonial';
import Footer from '@/components/Footer';

const HomePage = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Header showSearchBar={!isHeroVisible} />
      <div ref={heroRef}>
        <Hero />
      </div>
      <PopularCities />
      <PopularColleges />
      <Usp />
      <BudgetProperties />
      <PropertyType />
      <StudyGoal />
      <OurTestimonial />
      <Footer />
    </div>
  );
};

export default HomePage;
