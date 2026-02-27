import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { reecrireEmailAvecGemini } from './services/geminiApi';
import illu from './Promail-Rewriter-illustration-2.jpg';

import React from 'react'
import { use } from 'react'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

// Animation 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



const navigation = [
  { name: 'Acceuil', href: '#', current: true },
  { name: 'Fonctionnement', href: '#fonc', current: false },
  
  
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
//  constante pour zone de texte email

 const [emailOriginal, setEmailOriginal] = useState('');
 const [emailReecrit, setEmailReecrit] = useState('');
 const [tonSelectionne, setTonSelectionne] = useState('pro');
 const [isLoading, setIsLoading] = useState(false);

 const gererSaisieEmail = (event) => {
    setEmailOriginal(event.target.value);
  };

  const selectionnerTon = (ton) => {
    setTonSelectionne(ton);
  };

  //réécriture de l'email 
   const reecrireEmail =  async () => {
     if (!emailOriginal.trim()) {
    alert('Veuillez saisir un email avant de le réécrire');
    return;
  }

  //btn reecrire charge 
  setIsLoading(true);

  //Appel API
  try {
    const texteReecrit = await reecrireEmailAvecGemini(emailOriginal, tonSelectionne);
    setEmailReecrit(texteReecrit);//
  } catch (error) {
    console.error('Erreur complète :', error);
     alert('Erreur: ' + error.message); // CHANGE ICI pour voir l'erreur réelle
  } finally {
    setIsLoading(false);
  }

  };

  // copie du texte 
  const copierTexte = () => {
    navigator.clipboard.writeText(emailReecrit);
    alert('Texte copié dans le presse-papiers !');
  };

  // Animation 
  useEffect(() => {
    AOS.init({
      duration: 1000, // 1 seconde
      once: true // Animation une seule fois
    });
  }, []);

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Menu */}
      <Disclosure as="nav" className="relative  p-3 bg-gray-800 z-2">
        <div className="mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              {/* Menu */}
              {/* <div className="hidden sm:ml-6  sm:block">
                <div className="flex space-x-6 ">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div> */}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button
                type="button"
                className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button> */}

              <div className="hidden sm:ml-6  sm:block">
                <div className="flex space-x-6 ">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <button class="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"   onClick={() => document.getElementById('rewrite-section').scrollIntoView({ behavior: 'smooth' })}>
                          Commencer
              </button>
                        
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      
      </Disclosure>
      {/* hero section z-index ? si tu veux encore ajuster */}
      
             <div className=" relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden relative -mt-29 z-1">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-200 to-indigo-300 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-200 to-pink-300 opacity-20 blur-3xl"></div>
      </div>
      
      <div className="relative  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex flex-col md:flex-row  gap-4 min-h-screen flex items-center ">
          {/* Hero section 1er 50% */}
          <div data-aos="fade-up" className="w-full md:w-1/2  max-w-4xl mt-30">
            {/* Badge */}
            <div className="inline-flex  items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <span className="mr-2">✨</span>
              100% Gratuit • Aucune inscription requise
            </div>
            
            {/* Main Title */}
            <h1 style={{ fontFamily: 'Cascadia Mono, sans-serif' }} className="  text-xl sm:text-xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6" >
             Freelance : redige des emails clairs 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> et pro en 5 secondes</span>
            </h1>
            
            {/* Subtitle */}
            <p style={{  }}  className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
             Colle ton email brouillon, choisi le ton souhaité et obtient une version professionnelle, adaptée aux freelances ou PME, instantanément. 
              <strong className="text-gray-800"> Aucun compte. Aucune limites.</strong>
            </p>
            
            {/* Features list */}
            {/* <div className="flex flex-wrap  gap-6 mb-10 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Correction automatique
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ton professionnel adapté au contexte freelance
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Structure claire et lisible
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Résultat  en 5 secondes
              </div>
            </div> */}
            
            {/* CTA Buttons */}
            
            <btn  style = {{borderRadius : 20, marginLeft :  -12}}  onClick={() => document.getElementById('rewrite-section').scrollIntoView({ behavior: 'smooth' })} className = 'bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-6   rounded-lg transition-colors' > Essayer gratuitement &rarr; </btn> 
            {/* <a href='#fonc' className='ml-3' > Comment ça marche </a> */}
            {/* <a href="#fonc" className='ml-5' >Comment ça marche</a> */}
          </div>
           {/* Hero section 2e 50% */}
           <div data-aos="fade-up"  className='w-full md:w-1/2 justify-center   max-w-4xl mt-15'>
            <img alt="Promail-illustration" src={illu}/>
           </div>
        </div>
        
        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div> */}
        {/* scrool 2 */}
            
      </div>
    </div>
    {/* Champ de texte */}

          <div  className=" flex flex-col md:flex-row gap-4  -mt-29 z-0" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto'}}>
            <div data-aos="fade-up" id ="rewrite-section" className='w-full md:w-1/2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50  '>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              Votre email original
            </label>
            
            <textarea
              value={emailOriginal}
              onChange={gererSaisieEmail}
              placeholder="Collez votre email ici... 
              
Exemple : hey, pour le nouveau projet dont on a parlé, mon tarif c'est 500€. c'est ok pour toi ? on peut discuter si besoin. dis moi quand on se lance"
              style={{
                width: '100%',
                height: '300px',
                padding: '15px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                resize: 'vertical',
                backgroundColor: 'white'
              }}
            />
             {/* Boutons de ton */}
            <div style={{ marginTop: '20px' }}>
              <p style={{ 
                marginBottom: '10px', 
                fontWeight: '600',
                color: '#374151'
              }}>
                Choisissez le style :
              </p>

               {/* NOUVEAU CODE - Liste déroulante */}
              <div style={{ marginBottom: '20px' }}>
                <select
                  value={tonSelectionne}
                  onChange={(e) => selectionnerTon(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#374151',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                    paddingRight: '40px'
                  }}
                >
                  <option value="pro">👔 Professionnel - Ton formel et soutenu</option>
                  <option value="raccourcir">📝 Raccourcir - Version courte et concise</option>
                  <option value="clarifier">🔍 Clarifier - Plus précis et structuré</option>
                  <option value="prospection">📝 Prospecter - Prospection intelligente</option>
                </select>
              </div>

               {/* Bouton Réécrire */}
              <button
                onClick={reecrireEmail}
                disabled={isLoading || !emailOriginal.trim()}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: isLoading || !emailOriginal.trim() ? '#94a3b8' : '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: isLoading || !emailOriginal.trim() ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                {isLoading ? '✨ Réécriture en cours...' : '🚀 Réécrire l\'email'}
              </button>
            </div>
          </div>

           {/* Zone de résultat */}
          <div data-aos="fade-up" className='w-full md:w-1/2' >
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              Email réécrit
            </label>
            
            <div style={{
              position: 'relative',
              backgroundColor: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              minHeight: '300px'
            }}>
              {emailReecrit ? (
                <div style={{ padding: '15px' }}>
                  <pre style={{
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    color: '#374151',
                    margin: '0',
                    lineHeight: '1.6'
                  }}>
                    {emailReecrit}
                  </pre>
                  
                  <button
                    onClick={copierTexte}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      padding: '8px 12px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}
                  >
                    📋 Copier
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '300px',
                  color: '#94a3b8',
                  fontSize: '1.1rem'
                }}>
                  {isLoading ? (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
                      <div>Réécriture en cours...</div>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📝</div>
                      <div>Votre email réécrit apparaîtra ici</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Fonctionnement */} 
        <div   id = "fonc" className='text-center  bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden'>
              {/* Badge */}
            <div className="inline-flex  items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <span className="mr-2">✨</span>
                Fonctionnement
            </div>
              <h2 style={{ fontFamily: 'Cascadia Mono, sans-serif' }} className='text-2xl sm:text-xm lg:text-3xl font-bold text-gray-900 leading-tight mb-3'> Génerez des e-mail pro 
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> en 3 étapes simples </span>  </h2>
              <div style={{ fontFamily: 'Bpmf Iansui, cursive' }} className=' text-left inline-block  text-center ' > Avec notre outil, vous n'aurez plus besoin de trop réfléchir au mail parfait pour répondre à vos prospects.
                 <br/> Gagnez du temps et améliorez votre communication professionnelle en un clic. <br />
               ProMail Rewriter transforme instantanément vos brouillons informels en messages clairs, polis et percutants. <br /> 
               Concentrez-vous sur votre business, laissez l'IA s'occuper de vos emails. </div>
             
              {/* Differente box pour les fonctionnement */}
              
            <div  className= "  flex flex-col md:flex-row  gap-6 p-8" >
                <div data-aos="fade-up" className=" w-full text-center bg-gray-100 p-4 border border-gray-300 rounded-xl w-1/3 mt-15">
                  <span className='mr-2 text-2xl mb-4'> 📋 </span> <br/>
                  <b className='font-bold  text-xl sm:text-xl lg:text-xl font-bold text-gray-900 leading-tight  mb-3' > Collez votre email </b> <br/>
                  <div style={{ fontFamily: 'Bpmf Iansui, cursive' }}  className='max-w-md mt-2 text-left'>
                       Collez votre email informel, brouillon ou mal rédigé  la zone de texte . Aucune compétence technique requise.
                  </div>
                </div>

                <div data-aos="fade-up" className=" text-center w-full  bg-gray-100 p-4 border border-gray-300 rounded-xl w-1/3 mt-15">
                  <span className='mr-2 text-2xl mb-4'>🎯</span>
                  <h2 className='text-xl sm:text-xl lg:text-xl font-bold text-gray-900 leading-tight mb-3'>Choisissez le ton</h2>
                  <div style={{ fontFamily: 'Bpmf Iansui, cursive' }} className='max-w-md mx-auto text-left'>
                   Sélection du style souhaité : Professionnel (formel), Raccourcir (concis), ou Clarifier (structuré). 
                  </div>
                </div>

                <div data-aos="fade-up" className=" text-center w-full w-1/3 mt-15 bg-gray-100 p-4 border border-gray-300 rounded-xl">
                  <span className='mr-2 text-2xl mb-4'> 🚀</span>
                  <h2 className='text-xl sm:text-xl lg:text-xl font-bold text-gray-900 leading-tight mb-3'> Obtenez le résultat </h2>
                  <div style={{ fontFamily: 'Bpmf Iansui, cursive' }} className='max-w-md mx-auto text-left'>           
                      ProMail Rewriter  réécrit  l'email en quelques seconde.Tout ce qu'il vous restera a faire ce sera de copiez et envoyez..
                  </div>
                </div>
            </div>


        </div>
            {/* Differente box pour les avantages */}
          <div className='text-center mt-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden'>

                 <div className="  inline-flex  items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <span className="mr-2">✨</span>
                Avantages
            </div>
              <h2 style={{ fontFamily: 'Cascadia Mono, sans-serif' }} className='text-xl sm:text-xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3'> Pourquoi choisir 
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">  ProMail Rewriter </span> </h2>
              <p style={{ fontFamily: 'Bpmf Iansui, cursive' }}  className='text-center' >ProMail Rewriter est votre assistant intelligent d'aide à la  rédaction d'emails. <br /> Conçu pour
                 transformer vos messages informels en communications professionnelles impeccables.
                  <br /> Notre outil vous accompagne dans chaque échange avec vos clients et prospects.
                  </p>

              <div className= " flex flex-col md:flex-row  gap-6 p-8" >
                <div data-aos="fade-up" className="w-full bg-gray-100 p-6 border border-gray-300 rounded-xl w-1/3 mt-15">
                  <span className='mr-2 text-2xl mb-4'> ⏱️ </span>
                  <h3 className='text-xl sm:text-xl lg:text-xl font-bold text-gray-900 leading-tight mb-3'> Gain de temps </h3>
                  <div style={{ fontFamily: 'Bpmf Iansui, cursive' }}  className='text-xm sm:text-xm lg:text-xm' >
                        Rédigez des emails professionnels en quelques secondes au lieu de perdre des minutes à reformuler.
                  </div>
                </div>

                <div data-aos="fade-up" className=" w-full bg-gray-100 p-6 border border-gray-300 rounded-xl w-1/3 mt-15">
                  <span className='mr-2 text-2xl mb-4'>💼</span>
                  <h3 className='text-xl sm:text-xl lg:text-xl font-bold text-gray-900 leading-tight mb-3'>Communication professionnelle</h3>
                  <div style={{ fontFamily: 'Bpmf Iansui, cursive' }}  className='text-xm sm:text-xm lg:text-xm' >
                    Impressionnez vos clients et prospects avec des messages clairs, polis et bien structurés.
                  </div>
                </div>

                <div data-aos="fade-up" className=" w-full w-1/3 mt-15 bg-gray-100 p-6 border border-gray-300 rounded-xl">
                  <span className='mr-2 text-2xl mb-4'>✨</span>
                  <h2 className='text-xl sm:text-xl lg:text-xl font-bold text-gray-900 leading-tight mb-3'> Simplicité d'utilisation </h2>
                  <div style={{ fontFamily: 'Bpmf Iansui, cursive' }}  className='text-xm sm:text-xm lg:text-xm'>           
                      Aucune compétence technique requise. Collez, choisissez le ton, et c'est prêt.
                  </div>
                </div>
               

                </div>  

                <div style={{ marginTop : -60 }}  className='flex flex-col md:flex-row   gap-6 p-8'>
                       <div data-aos="fade-up" className=" w-full w-1/3 mt-15 bg-gray-100 p-6 border border-gray-300 rounded-xl">
                          <span className='mr-2 text-2xl mb-4'>  🤖 </span>
                          <h3 className='text-xl sm:text-xl lg:text-xl font-bold text-gray-900 leading-tight mb-3'> IA performante </h3>
                          <div style={{ fontFamily: 'Bpmf Iansui, cursive' }}  className='text-xm sm:text-xm lg:text-xm'>           
                              Propulsé par Gemini AI pour des réécritures naturelles et adaptées au contexte professionnel.
                          </div>
                        </div>

                  <div data-aos="fade-up" className=" w-full w-1/3 mt-15 bg-gray-100 p-6 border border-gray-300 rounded-xl">
                    <span className='mr-2 text-2xl mb-4'>🆓</span>
                    <h3 className='text-xl sm:text-xl lg:text-xl font-bold text-gray-900 leading-tight mb-3'> Gratuit et accessible </h3>
                    <div style={{ fontFamily: 'Bpmf Iansui, cursive' }}  className='text-xm sm:text-xm lg:text-xm'>           
                        Utilisez l'outil sans compte ni abonnement. Disponible 24/7 depuis n'importe quel appareil.
                    </div>
                  </div>
                  <div data-aos="fade-up" className=" w-full w-1/3 mt-15 bg-gray-100 p-6 border border-gray-300 rounded-xl">
                    <span className='mr-2 text-2xl mb-4'>♾️</span>
                    <h3 className='text-xl sm:text-xl lg:text-xl font-bold text-gray-900 leading-tight mb-3'> Aucune limite d'utilisation </h3>
                    <div style={{ fontFamily: 'Bpmf Iansui, cursive' }}  className='text-xm sm:text-xm lg:text-xm'>           
                        Réécrivez autant d'emails que vous le souhaitez sans restriction ni quota journalier.
                    </div>
                  </div>
                </div>


          </div>










                  {/* Footer */}
                {/* <footer className='mt-20 flex  bg-gray-50  flex-col md:flex-row  gap-6 p-8' >
                          
                    <div className=' w-full text-center '>
                        <h4 style={{ fontFamily: 'Cascadia Mono, sans-serif' }} className='text-2xl text-left sm:text-xm lg:text-3xl font-bold text-gray-900 leading-tight mb-3'> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Promail Rewriter </span>  </h4>
                        <p style={{ fontFamily: 'Bpmf Iansui, cursive', fontSize : 14 }} className='text-left'> <b> Votre assistant d'aide à la rédaction d'emails professionnels </b>
                          Gagnez du temps et impressionnez vos contacts <br />
                          avec des messages clairs, polis et parfaitement rédigés en quelques secondes..</p>
                    </div>

                    {/* Produuit */}
                    {/* <div  className=' w-full text-center  w-1/3  '>
                        
                        <h4 className="mb-8 mt-2 font-bold ">PRODUIT</h4>
                        <div style={{ fontFamily: 'Bpmf Iansui, cursive', fontSize : 14 }} className=" text-center">
                          <ul>
                          <li className='mb-3' > <a href="#fonc">Fonctionnement</a> </li>
                          <li> <a href="http://">Avantages</a> </li>
                            <li></li>
                          </ul>
                        </div>
                    </div> */}

                    {/* Contact
                    <div  className=' w-full text-center  w-1/3  '>
                        
                        <h4 className="mb-8 mt-2 font-bold ">CONTACT</h4>
                        <div style={{ fontFamily: 'Bpmf Iansui, cursive', fontSize : 14 }} className=" text-center">
                          <ul>
                          <li className='mb-3' > <a href="www.linkedin.com/in/hafiz-yessoufou-82b3223b1">Linked</a> </li>
                          <li> <a href="http://">WhatsApp</a> </li>
                            <li></li>
                          </ul>
                        </div>
                    </div>

                </footer> */}
       
      </div>

 
      
      
     
)


}

