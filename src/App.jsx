import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { reecrireEmailAvecGemini } from './services/geminiApi';

import React from 'react'
import { use } from 'react'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Acceuil', href: '#', current: true },
  { name: 'Fonctionalités', href: '#', current: false },
  
  
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

  return (
    <div>
      {/* Menu */}
      <Disclosure as="nav" className="relative p-3 bg-gray-800 z-2">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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

              <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                          Connexion
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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl">
            {/* Badge */}
            <div className="inline-flex  items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <span className="mr-2">✨</span>
              100% Gratuit • Aucune inscription requise
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
             Freelances : Gagnez des contrats avec des 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> emails pros en 1 clic</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
             Collez votre email, choisissez le ton souhaité et obtenez une version professionnelle , adapter pour freelance , instantanément. 
              <strong className="text-gray-800"> Pas d'inscription, pas de limites.</strong>
            </p>
            
            {/* Features list */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-gray-600">
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
                Ton professionnel adapté freelance
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Structure optimisée
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Résultat en 5 secondes
              </div>
            </div>
            
            {/* CTA Buttons */}
            
            
            
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        {/* scrool 2 */}
            
      </div>
    </div>
    {/* Champ de texte */}

          <div  className="-mt-29 z-0" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto'}}>
            <div className='bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50  '>
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

               <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {[
                  { id: 'raccourcir', label: '📝 Raccourcir', desc: 'Version courte' },
                  { id: 'clarifier', label: '🔍 Clarifier', desc: 'Plus précis' },
                  { id: 'pro', label: '👔 Professionnel', desc: 'Ton formel' },
                  { id: 'prospection', label: '👔 Prospection', desc: 'prospecter' } //
                ].map(option => (
                  <button
                    key={option.id}
                    onClick={() => selectionnerTon(option.id)}
                    style={{
                      padding: '12px 16px',
                      border: tonSelectionne === option.id ? '2px solid #2563eb' : '2px solid #e2e8f0',
                      backgroundColor: tonSelectionne === option.id ? '#eff6ff' : 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      color: tonSelectionne === option.id ? '#2563eb' : '#64748b',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>{option.label}</div>
                    <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                      {option.desc}
                    </div>
                  </button>
                ))}
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
          <div>
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
      



          </div>
       
     
)


}

