'use client'

import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import './page.scss'
import TextInput from './(components)/TextInput'

export default function Home (): JSX.Element {
  const [isValid, setIsValid] = useState<boolean>(false)
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    file: '',
    text: '',
    agreement: false
  })

  function handleChange (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const el = e.target as HTMLInputElement
    if (el.type === 'file') {
      if (el.files !== null) {
        setFormData({ ...formData, [el.name]: el.files?.[0]?.name })
      } else {
        setFormData({ ...formData, [el.name]: '' })
      }
    } else {
      setFormData({
        ...formData,
        [el.name]: el.type === 'checkbox'
          ? el.checked
          : el.value
      })
    }
  }

  function deleteFile (): void {
    setFormData({ ...formData, file: '' })
  }

  function validation (): boolean {
    const { name, company, phone, email, file, text, agreement } = formData
    const phoneRegex = /\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,20}$/

    const result = agreement &&
    name.trim() !== '' &&
    company.trim() !== '' &&
    Boolean(email.match(emailRegex)) &&
    Boolean(phone.match(phoneRegex)) &&
    (text.length > 10 || file !== '')

    return result
  }

  function handleSubmit (e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const form = new FormData(e.currentTarget as HTMLFormElement)
    const data = Object.fromEntries(form)
    delete data.agreement
    console.log('data: ', data)
  }

  useEffect(() => {
    setIsValid(validation())
  }, [formData])

  return (
    <main className='main'>
      <div className={`card ${isFlipped ? 'card--flipped' : ''}`}>
        <div className="card__inner">
          <div className="card__front">
            <h2 className="card__title">Сообщение в свободной форме</h2>

            <div className="card__content">
              <form className="form" onSubmit={handleSubmit}>

                <TextInput name="name" value={formData.name} placeholder="Ваше имя" handleChange={handleChange}/>
                <TextInput name="company" value={formData.company} placeholder="Компания" handleChange={handleChange}/>
                <TextInput type="tel" name="phone" value={formData.phone} placeholder="Телефон" handleChange={handleChange}/>
                <TextInput name="email" value={formData.email} placeholder="Электронная почта" handleChange={handleChange}/>

                <div className="form__stack">
                  <div className="form__group">
                    <textarea
                      value={formData.text}
                      onChange={handleChange}
                      name="text"
                      id="form__text"
                      className="form__text"
                      placeholder="Напишите текст обращения"
                      rows={4}
                      disabled={formData.file !== ''}
                    />
                    <button type="button" className="button hint-button" onClick={() => { setIsFlipped(true) }}>?</button>
                  </div>

                  <div className="form__file-group">
                    <input
                      type="file"
                      onChange={handleChange}
                      name="file"
                      id="form__file"
                      className='form__file'
                      disabled={formData.text !== ''}
                    />
                    <label htmlFor="form__file" className="form__file-label">или прикрепите файл</label>

                    {
                      formData.file !== '' &&
                      <div className="form__file-uploaded">
                        <span className='form__file-uploaded__fileName'>{formData.file}</span>
                        <button type="button" className="button delete-button" onClick={() => { deleteFile() }}>
                          Удалить файл
                        </button>
                      </div>
                    }

                  </div>
                </div>

                <div className="form__footer">
                  <div className="form__checkbox-group">
                    <input
                      id="form__data-agreement"
                      type="checkbox"
                      name="agreement"
                      checked={formData.agreement}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor='form__data-agreement'>
                      согласен на обработку моих <a href="#">персональных данных</a>
                    </label>
                  </div>

                  <button type="submit" className="button" disabled={!isValid}>Отправить</button>
                </div>
              </form>
            </div>

          </div>
          <div className="card__back">
            <h2 className="card__title">Что написать в сообщении или файле?</h2>

            <div className="card__content">
              <ol className='card__faq'>
                <li>
                  <h3>Чем вы занимаетесь?</h3>
                  <p>Расскажите о своей компании.</p>
                  <p>Как работаете, на чем зарабатываете?</p>
                  <p>Кто ваши конкуренты?</p>
                  <p>Чем вы от них отличаетесь?</p>
                </li>
                <li>
                  <h3>В чем ваша задача?</h3>
                  <p>Чего хотите достичь в ближайшем будущем?</p>
                  <p>Что вам мешает?</p>
                </li>
                <li>
                  <h3>Каким вы видите решение задачи?</h3>
                  <p>Как планируете достичь своих целей?</p>
                  <p>Какие решения пробовали раньше?</p>
                </li>
                <li>
                  <h3>Какие у вас ожидания от результата?</h3>
                  <p>В каком виде вы хотите видеть решение вашей задачи? </p>
                  <p>В какой срок?</p>
                  <p>Почему он важен? На что это должно быть похоже?</p>
                </li>
                <li>
                  <h3>Сколько денег планируете потратить?</h3>
                  <p>Каков ваш бюджет?</p>
                  <p>Почему вы готовы потратить именно такую сумму?</p>
                </li>
              </ol>
              <div className="card__footer">
                <button type="button" className="button pictured-button" onClick={() => { setIsFlipped(false) }}>
                  Вернуться к заполнению
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
