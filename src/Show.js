import React from 'react'
import {
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, ListItem, List, Quote, Spectacle, Slide, Text
} from 'spectacle';

import config from './config'
import DataSource from './DataSource'
import createTheme from "spectacle/lib/themes/default";

const theme = createTheme({
  primary: "#ff4081"
});


const createItemContent = (block, index) => {
  switch(block.type) {
    case 'image':
      if(index === 0 && (block.metadata.title == '' || block.metadata.title == undefined)) return null

      if(block.metadata.title) {

        const head = <Heading size={1} caps textColor='primary'>{block.metadata.title}</Heading>
        const description = <Text textColor='tertiary'>{block.metadata.description}</Text>
        return [head, description]
      }
      return <Image margin="40px auto 40px" src={block.cover.src} width="100%" key={block.id} />
    case 'text':
      return <Text textColor='tertiary' key={block.id}></Text>
    case 'h1':
      return <Heading size={1} caps textColor='primary' key={block.id}>{block.text}</Heading>
    case 'h2':
      return <Heading size={2} caps textColor='tertiary' key={block.id}>{block.text}</Heading>
    case 'h3':
      return <Heading size={3} caps textColor='tertiary' key={block.id}>{block.text}</Heading>
    default:
      return null

  }
}

const createItemSlide = (item) => {
  const contents = item.content.map(createItemContent)
  const slideConfig = {
    transition:["spin", "slide"]
  }
  if(item.block && item.block.cover) {
    if(item.content.length > 1 || item.block.metadata.title != '') {
      slideConfig.bgDarken = 0.75
    }
    slideConfig.bgImage  = item.block.cover.src
  } else {
    slideConfig.bgColor = 'secondary'
  }

  const slideNotes = item.content.map((bl) => {
    if(bl.type == 'text') {
      return bl.text
    }
    return ''
  }).join(' ')

  return (
    <Slide notes={slideNotes} key={item.id} {...slideConfig}>
      {contents}
    </Slide>
  )
}


class SpectacleResult extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      site: null,
      items: null
    }
  }

  componentWillReceiveProps(nextProps, context) {
    // items not loaded yet
    if(this.state.items === null) {
      const result = (context.result) ? context.result.result : []
      const itemsToLoad =result.map((item) => item.id)
      const fetchPromises = []

      fetchPromises.push(context.apiGet(`/site`))
      itemsToLoad.forEach((id) => {
        fetchPromises.push(context.apiGet(`/item/${id}`))
      })

      Promise.all(fetchPromises)
      .then((results) => {
        const sites = results.shift().body
        const site = sites.find((s) => s.repo === this.props.repo)
        debugger;
        const loadedItems = results.map((resp) => resp.body)
        this.setState({ items: loadedItems })
      })
    }

  }

  render() {
    const { items } = this.state
    if(!items) return null

    const slides = items.map(createItemSlide)
    if(slides.length == 0) return null


    return (
      <Spectacle theme={theme}>
        <Deck>
          {slides}
        </Deck>
      </Spectacle>
    )
  }
}



SpectacleResult.contextTypes = {
  result: React.PropTypes.object,
  apiGet: React.PropTypes.any
}

class ShowComponent extends React.Component {
  render() {
    const path = `/item?site=${this.props.params.siteRepo}&published=true&offset=0&limit=20`
    return (
      <DataSource config={config} path={path}>
        <SpectacleResult repo={this.props.params.siteRepo}/>
      </DataSource>
    );
  }
}

export default ShowComponent
