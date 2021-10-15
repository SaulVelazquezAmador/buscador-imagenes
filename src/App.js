import './header.css'
import { Formik, Form, Field } from 'formik'
import { useState } from 'react';
import './content.css'
import './article.css'

const App=()=>{
  const [photos, setPhotos] = useState([])

  const open = url => window.open(url)

  return (
    <div>
      <header>
        <Formik
          initialValues={{search: ''}}
          onSubmit={async values=>{
                      const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
                        headers:{
                          'Authorization': 'Client-ID blUJ4AJSJtHvk3-qjv4vQ40YmBn-AEwydM43b1NfP1Q'
                        }
                      })
                      const data = await response.json()
                      setPhotos(data.results)
                    }}
        >
          <Form>
            <Field name="search"/>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
            <article key={photo.id} onClick={()=> open(photo.links.html)}>
              <img alt={photo.decription} src={photo.urls.regular}/>
              <p>{[photo.decription, photo.alt_description].join(' - ')}</p>
            </article>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
