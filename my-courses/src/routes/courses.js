const express = require('express');
const router = express.Router();

const FAKE_COURSES = [
  {
    title: 'Data Structures',
    description:
      'This interactive textbook was written with the intention of teaching Computer Science students about various data structures as well as the applications in which each data structure would be appropriate to use.',
    tags: [],
    lessions: [
      'Array Lists',
      'Linked Lists',
      'Skip Lists',
      'Circular Arrays',
      'Abstract Data Types',
      'Deques',
      'Queues',
      'Stacks',
      'And the Iterators Gonna Iterate-ate-ate',
    ],
  },
  {
    title: 'Bioinformatics Algorithms',
    description:
      'Explore the power of computing in modern biology and apply existing software tools to find recurring biological motifs within genes that are responsible for helping Mycobacterium tuberculosis go "dormant" within a host for many years before causing an active infection. Interactive preview of Bioinformatics Algorithms: An Active Learning Approach.',
    tags: [],
    lessions: [
      'A Journey of a Thousand Miles. . .',
      'Hidden Messages in the Replication Origin',
      'Some Hidden Messages are More Surprising than Others',
      'An Explosion of Hidden Messages',
      'The Simplest Way to Replicate DNA',
      'Asymmetry of Replication',
      'Peculiar Statistics of the Forward and Reverse Half-Strands',
      'Some Hidden Messages are More Elusive than Others',
      'A Final Attempt at Finding DnaA Boxes in E. coli',
    ],
  },
  {
    title: 'Linear Algebra: Problems and Methods',
    description:
      'The goal of the course is explain the fundamental ideas of linear algebra and how to use them to find easy solutions of hard problems.',
    tags: [],
    lessions: [
      'Welcome to the Linear Algebra course at Stepik',
      'Concept of linear space',
      'Coordinates of vectors and linear maps',
      'Systems of linear equations',
      'Structure of linear spaces',
      'Lesson by Emil Wiedemann',
      'Quick reference',
    ],
  },
  {
    title: 'Kotlin',
    description:
      "Kotlin is the modern ﻿statically typed programming language for the JVM, Android and the browser.\nIt's concise, safe and versatile. Kotlin code can be compiled into JVM bytecode, JavaScript or directly to the native machine code.",
    tags: [],
    lessions: [
      'Hello, world!',
      'Java to Kotlin conversion',
      'Named arguments',
      'Default arguments',
      'Lambdas',
      'Strings',
      'Data classes',
      'Nullable types',
      'Smart casts',
      'Extension functions',
      'Object expressions',
      'SAM conversions',
      'Extension functions on collections',
    ],
  },
];

const FAKE_NEW_COURSE = {
  title: 'New Course Title',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  tags: [],
  lessions: ['New lession'],
};

router.get('/', (req, res) => {
  res.render('courses', { courses: FAKE_COURSES });
});

router.get('/create', (req, res) => {
  res.render('create-course', {});
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const course = FAKE_COURSES[id];
  res.render('course', course);
});

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  const course = FAKE_NEW_COURSE;
  res.render('edit-course', course);
});

module.exports = router;
