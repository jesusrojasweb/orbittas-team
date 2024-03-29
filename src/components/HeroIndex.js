import React, { useState, useEffect, Fragment, useContext } from "react"
import {
  Particulas,
  Hero,
  Copy,
  Item,
  Container,
  Btn,
  Cursor,
  Subitle,
  Title,
  Propuesta1,
  Propuesta1Hover,
} from "../styles/components/HeroIndex"
import { useTranslate } from "react-translate"
import particles from "../assets/heroParticles"
import Mujer from "./images/Mujer"
import MujerHover from "./images/MujerHover"
import { Context } from "../context"

const HeroIndex = ({ changed, handleChange }) => {
  const [word, setWord] = useState("")
  const [chagedWord, setChangedWord] = useState(false)

  const { idiomaChanged, idioma } = useContext(Context)

  function escritura(palabra) {
    let palabraContador = word
    let count = 0
    let interval
    if (!chagedWord) {
      interval = setInterval(function() {
        escribir(palabra)
      }, 100)
    }

    function changeWord(otraPalabra) {
      setChangedWord(true)
    }

    let escribir = palabra => {
      let array = palabra.split("")
      if (count < array.length) {
        palabraContador += array[count]
        setWord(palabraContador)
        count++
      }
      if (count > array.length - 1) {
        clearInterval(interval)
        count = 0
      }
    }
    return [word, changeWord]
  }

  useEffect(() => {
    escritura(tagline)
  }, [])

  let t = useTranslate("heroHomePage")
  let tagline = t("tagline")

  return (
    <Hero>
      <Particulas params={particles} />
      <Copy idioma={idioma}>
        <Item>
          <Title>
            <b>¿</b>
            {t("titleFirst")} <br /> {t("titleSecond")}{" "}
            <strong>{t("titleThird")}?</strong>
          </Title>
          {idiomaChanged ? (
            <Subitle>
              <span>{tagline}</span>
              <Cursor />
            </Subitle>
          ) : (
            <Subitle>
              <span>{word}</span>
              <Cursor />
            </Subitle>
          )}

          <Container>
            <Btn to={`/contact`}>{t("button")}</Btn>
          </Container>
        </Item>
        <Item>
          <Fragment>
            <Propuesta1>
              <Mujer />
            </Propuesta1>
            <Propuesta1Hover>
              <MujerHover />
            </Propuesta1Hover>
          </Fragment>
        </Item>
      </Copy>
    </Hero>
  )
}
export default HeroIndex
