import { useEffect, useState } from 'react'
import * as S from './styles'

const TableOfContents = ({ mainRef }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const els = [];
    let currentH2 = {};
    const elements = mainRef.current.querySelectorAll('h2, h3');

    elements.forEach(element => {
      if(element.nodeName === 'H2') {
        if(Object.keys(currentH2).length !== 0) {
          els.push(currentH2);
      }

      currentH2 = { name: element.innerText, h3s: [] };
      }

      if(element.nodeName === 'H3') {
        currentH2.h3s.push({ name: element.innerText })
      }
    });
    els.push(currentH2);
    console.log("els", els);

    // h3Elements.forEach((h3, index) => {
    //   // You can customize how you generate the IDs. Here's a simple example:
    //   h3.id = `heading-${index}`
    // })
  }, [mainRef])

  return (
    <S.TableOfContents>
    </S.TableOfContents>
  )
}

export default TableOfContents
