export default async function handler(req, res) {
  try {
    const { title, artist, album, duration } = req.query

    if (!title || !artist) {
      return res.status(400).json({
        error: "Título e artista são obrigatórios",
      })
    }

    const cleanTitle = title.trim()
    const cleanArtist = artist.trim()
    const cleanAlbum = album?.trim() || ""

    const getParams = new URLSearchParams({
      track_name: cleanTitle,
      artist_name: cleanArtist,
    })

    if (cleanAlbum) {
      getParams.set("album_name", cleanAlbum)
    }

    if (duration) {
      getParams.set("duration", duration)
    }

    const getUrl = `https://lrclib.net/api/get?${getParams.toString()}`
    
    let response = await fetch(getUrl, {
      headers: {
        "User-Agent": "MusicApp/1.0",
      },
    })

    if (response.status === 404) {
      const searchParams = new URLSearchParams({
        track_name: cleanTitle,
        artist_name: cleanArtist,
      })

      const searchUrl = `https://lrclib.net/api/search?${searchParams.toString()}`

      console.log("Música não encontrada no /get.")
      console.log("Tentando busca no /search:")
      console.log(searchUrl)

      response = await fetch(searchUrl, {
        headers: {
          "User-Agent": "MusicApp/1.0",
        },
      })

      if (!response.ok) {
        const errorText = await response.text()

        console.error("Erro na busca do LRCLIB:", response.status, errorText)

        return res.status(502).json({
          error: "Erro ao consultar o LRCLIB",
        })
      }

      const results = await response.json()

      if (!Array.isArray(results) || results.length === 0) {
        return res.status(404).json({
          error: "Letra não encontrada",
        })
      }

      const normalize = (text = "") =>
        text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()

      const normalizedTitle = normalize(cleanTitle)
      const normalizedArtist = normalize(cleanArtist)

      let song = results.find((item) => {
        const itemTitle = normalize(item.trackName)
        const itemArtist = normalize(item.artistName)

        return itemTitle === normalizedTitle && itemArtist === normalizedArtist
      })

      if (!song) {
        song = results.find((item) => {
          const itemTitle = normalize(item.trackName)

          return itemTitle === normalizedTitle
        })
      }

      if (!song) {
        song = results[0]
      }

      const lyrics =
        song.plainLyrics ||
        song.syncedLyrics?.replace(/\[\d{2}:\d{2}(?:\.\d{2,3})?\]\s?/g, "")

      if (!lyrics) {
        return res.status(404).json({
          error: "Letra não encontrada",
        })
      }

      return res.status(200).json({
        lyrics,
      })
    }

    if (!response.ok) {
      const errorText = await response.text()

      console.error("Erro no LRCLIB:", response.status, errorText)

      return res.status(502).json({
        error: "Erro ao consultar o LRCLIB",
      })
    }

    const data = await response.json()

    const lyrics =
      data.plainLyrics ||
      data.syncedLyrics?.replace(/\[\d{2}:\d{2}(?:\.\d{2,3})?\]\s?/g, "")

    if (!lyrics) {
      return res.status(404).json({
        error: "Letra não encontrada",
      })
    }

    return res.status(200).json({
      lyrics,
    })
  } catch (error) {
    console.error("ERRO AO BUSCAR LETRA:", error)

    return res.status(500).json({
      error: "Erro ao buscar a letra",
    })
  }
}