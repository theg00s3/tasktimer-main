import React from 'react'

module.exports = function mainContent () {
  return <div class='content subscribe-content'>

    <h1>New product announcement! <a class='giant' href='https://frittata.cc' target='_blank'>frittata.cc</a></h1>
    <h2>Subscribe to get the latest news and be the first to get the hands on the new product!</h2>
    <div id='mc_embed_signup'>
      <form action='https://frittata.us17.list-manage.com/subscribe/post?u=f9f62da992643442c3bc702c8&amp;id=e7676584cf' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' class='validate' target='_blank' novalidate>
        <div id='mc_embed_signup_scroll'>
          <input type='email' value='' name='EMAIL' class='email' id='mce-EMAIL' placeholder='subscribe with your email!' required />
          <div style='position: absolute; left: -5000px;' aria-hidden='true'><input type='text' name='b_f9f62da992643442c3bc702c8_e7676584cf' tabindex='-1' value='' /></div>
          <div class='clear'>
            <input type='submit' value='Subscribe' name='subscribe' id='mc-embedded-subscribe' class='button' />
          </div>
        </div>
      </form>
    </div>
  </div>
}
