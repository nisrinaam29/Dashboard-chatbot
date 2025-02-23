import ISTInstruction from '@/components/instructions/ISTInstruction'
import ISTInstruction01 from '@/components/instructions/ISTInstruction01'
import ISTInstruction02 from '@/components/instructions/ISTInstruction02'
import ISTInstruction03 from '@/components/instructions/ISTInstruction03'
import ISTInstruction04 from '@/components/instructions/ISTInstruction04'
import ISTInstruction05 from '@/components/instructions/ISTInstruction05'
import ISTInstruction06 from '@/components/instructions/ISTInstruction06'
import ISTInstruction07 from '@/components/instructions/ISTInstruction07'
import ISTInstruction09 from '@/components/instructions/ISTInstruction09'
import ISTInstruction08 from '@/components/instructions/ISTInstruction08'
import EPPSInstruction from '@/components/instructions/EPPSInstruction'
import PapiInstruction from '@/components/instructions/PapiInstruction'

export const testInstructions = [
  {
    title: 'Instruksi',
    buttonText: 'Lanjut',
    instruction: <ISTInstruction />,
    type: 'parent',
    children: [
      {
        title: '01',
        buttonText: 'Mulai',
        instruction: <ISTInstruction01 />,
        type: 'child',
        time: 6 * 60,
        example: {
          question: 'Seekor kuda mempunyai kesamaan yang terbanyak dengan seekor...',
          labels: ['Kucing', 'Bajing', 'Keledai', 'Lembu', 'Anjing'],
          values: ['a', 'b', 'c', 'd', 'e']
        }
      },
      {
        title: '02',
        buttonText: 'Mulai',
        instruction: <ISTInstruction02 />,
        type: 'child',
        time: 6 * 60,
        example: {
          question: '',
          labels: ['meja', 'kursi', 'burung', 'lemari', 'tempat tidur'],
          values: ['a', 'b', 'c', 'd', 'e']
        }
      },
      {
        title: '03',
        buttonText: 'Mulai',
        instruction: <ISTInstruction03 />,
        type: 'child',
        time: 7 * 60,
        example: {
          question: 'Hutan: pohon = tembok : ?',
          labels: ['batu bata', 'rumah', 'senen', 'putih', 'dinding'],
          values: ['a', 'b', 'c', 'd', 'e']
        }
      },
      {
        title: '04',
        buttonText: 'Mulai',
        instruction: <ISTInstruction04 />,
        type: 'child',
        time: 8 * 60,
        example: {
          question: 'Ayam - itik'
        }
      },
      {
        title: '05',
        buttonText: 'Mulai',
        instruction: <ISTInstruction05 />,
        type: 'child',
        time: 10 * 60,
        example: {
          question: 'Sebatang pensil harganya 25 rupiah. Berapakah harga 3 batang ?'
        }
      },
      {
        title: '06',
        buttonText: 'Mulai',
        instruction: <ISTInstruction06 />,
        type: 'child',
        time: 10 * 60,
        example: {
          question: '2, 4, 6, 8, 10, 12, 14, ?'
        }
      },
      {
        title: '07',
        buttonText: 'Mulai',
        instruction: <ISTInstruction07 />,
        type: 'child',
        time: 7 * 60,
        example: {
          question: '',
          labels: [],
          values: []
        }
      },
      {
        title: '08',
        buttonText: 'Mulai',
        instruction: <ISTInstruction08 />,
        type: 'child',
        time: 9 * 60,
        example: {
          question: '',
          labels: [],
          values: []
        }
      },
      {
        title: '09',
        buttonText: 'Mulai',
        instruction: <ISTInstruction09 />,
        type: 'child',
        timeInstruction: 3 * 60,
        time: 6 * 60,
        example: {
          question: 'Kata yang mempunyai huruf permulaan - Q - adalah suatu.........................',
          labels: ['bunga', 'perkakas', 'burung', 'kesenian', 'binatang'],
          values: ['a', 'b', 'c', 'd', 'e']
        }
      }
    ]
  },
  {
    title: 'Instruksi',
    buttonText: 'Mulai',
    instruction: <PapiInstruction />,
    children: []
  },
  {
    title: 'Instruksi',
    buttonText: 'Mulai',
    instruction: <EPPSInstruction />,
    children: []
  }
]
