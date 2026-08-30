import { SocialLink } from '../types';

export const contactConfig = {
  name: 'Ibarakumo Owonaro',
  email: 'ibarakumo22@gmail.com',
  call: {
    display: '+234 08033398325',
    tel: 'tel:+2348033398325',
    raw: '+2348033398325'
  },
  whatsapp: {
    display: '+234 09012144131',
    url: 'https://wa.me/2349012144131',
    raw: '2349012144131',
    defaultMessage: 'Hello Ibarakumo, I found your portfolio and I would like to discuss a project with you.'
  },
  location: 'Nigeria · Available Worldwide for Remote & Onsite Collaboration',
  availability: 'Open for Freelance, Full-time Roles & Creative Collaborations'
};

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    platform: 'github',
    url: 'https://github.com',
    handle: 'ibarakumo',
    icon: 'Github'
  },
  {
    name: 'LinkedIn',
    platform: 'linkedin',
    url: 'https://linkedin.com',
    handle: 'ibarakumo-owonaro',
    icon: 'Linkedin'
  },
  {
    name: 'Behance',
    platform: 'behance',
    url: 'https://behance.net',
    handle: 'ibarakumo',
    icon: 'Palette'
  },
  {
    name: 'Dribbble',
    platform: 'dribbble',
    url: 'https://dribbble.com',
    handle: 'ibarakumo',
    icon: 'Dribbble'
  },
  {
    name: 'Instagram',
    platform: 'instagram',
    url: 'https://instagram.com',
    handle: '@ibarakumo',
    icon: 'Instagram'
  },
  {
    name: 'YouTube',
    platform: 'youtube',
    url: 'https://youtube.com',
    handle: '@ibarakumo-creative',
    icon: 'Youtube'
  }
];
