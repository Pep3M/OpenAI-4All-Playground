import { Box, IconButton, Input } from "@mui/material"
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import { useEffect, useState } from "react";

const KeySaver = () => {
  const [openKeyInput, setOpenKeyInput] = useState(false)
  const [key, setKey] = useState("")

  useEffect(() => {
    // save key with a debounce
    const debounce = setTimeout(() => {
      saveKey(key)
    }, 1000)
    return () => clearTimeout(debounce)
  }, [key])
  
  const saveKey = (key) => {
    if (key.length > 0) {
      localStorage.setItem("openai_key", key)
      return
    }
    localStorage.removeItem("openai_key")
  }
  
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        justifyContent: "flex-end",
        alignItems: "center",
        flexGrow: 1
      }}
    >
      <Input
        style={{ display: openKeyInput ? "block" : "none", maxWidth: 300}}
        placeholder="Introduzca su API Key"
        inputProps={{ "aria-label": "openai key" }}
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <IconButton
        color="primary"
        aria-label="open key input"
        edge="end"
        onClick={() => setOpenKeyInput(!openKeyInput)}
      >
        {!openKeyInput ? <KeyIcon /> : <KeyOffIcon />}
      </IconButton>
    </Box>
  )
}
export default KeySaver