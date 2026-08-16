# HUBB Cosmos 3 video-to-video recipes

Clone NVIDIA Cosmos, start a Generator server, then transfer the HUBB pack films:

```bash
gh repo clone NVIDIA/cosmos
export COSMOS_API_URL=http://127.0.0.1:8000
python3 scripts/cosmos-transfer-hubb.py --all
```

vLLM-Omni transfer uses `POST /v1/videos/sync` with the existing HUBB film as
`input_reference` and the Sobel edge map in `public/video/controls`.

## classic

Photoreal commercial product cinematography of an approved HUBB Classic matte-black sunflower-seed pouch standing on warm AlUla sandstone. Coarse salt crystals sparkle on dark stone. Golden-hour raking light from camera left, shallow depth of field, 85mm lens, physically accurate foil and matte pack materials, natural roasted striped sunflower seeds and golden kernels, cobalt-blue color entering only through light and ingredients. Slow tactile camera push. No people, no hands, no faces, no new logos, no invented Arabic, no green-coated kernels.

## lemon-salt

Photoreal commercial product cinematography of an approved HUBB Lemon Salt matte-black sunflower-seed pouch standing on warm AlUla sandstone. Lemon peel and clean salt sit in the foreground. Golden-hour raking light from camera left, shallow depth of field, 85mm lens, physically accurate foil and matte pack materials, natural roasted striped sunflower seeds and golden kernels, citrine-yellow color entering only through light and ingredients. Slow tactile camera push. No people, no hands, no faces, no new logos, no invented Arabic, no green-coated kernels.

## hot-salt

Photoreal commercial product cinematography of an approved HUBB Hot & Salt matte-black sunflower-seed pouch standing on warm AlUla sandstone. Dried chili fragments catch hard side light. Golden-hour raking light from camera left, shallow depth of field, 85mm lens, physically accurate foil and matte pack materials, natural roasted striped sunflower seeds and golden kernels, chili-red color entering only through light and ingredients. Slow tactile camera push. No people, no hands, no faces, no new logos, no invented Arabic, no green-coated kernels.

## spices

Photoreal commercial product cinematography of an approved HUBB Spices matte-black sunflower-seed pouch standing on warm AlUla sandstone. Saffron dust and warm spice fragments drift in the air. Golden-hour raking light from camera left, shallow depth of field, 85mm lens, physically accurate foil and matte pack materials, natural roasted striped sunflower seeds and golden kernels, saffron-orange color entering only through light and ingredients. Slow tactile camera push. No people, no hands, no faces, no new logos, no invented Arabic, no green-coated kernels.

## ghawa

Photoreal commercial product cinematography of an approved HUBB Ghawa matte-black sunflower-seed pouch standing on warm AlUla sandstone. Coffee beans and cardamom rest in copper light. Golden-hour raking light from camera left, shallow depth of field, 85mm lens, physically accurate foil and matte pack materials, natural roasted striped sunflower seeds and golden kernels, copper color entering only through light and ingredients. Slow tactile camera push. No people, no hands, no faces, no new logos, no invented Arabic, no green-coated kernels.

## matcha

Photoreal commercial product cinematography of an approved HUBB Matcha matte-black sunflower-seed pouch standing on warm AlUla sandstone. A jade powder trace stays in the artwork; kernels stay naturally roasted gold. Golden-hour raking light from camera left, shallow depth of field, 85mm lens, physically accurate foil and matte pack materials, natural roasted striped sunflower seeds and golden kernels, jade color entering only through light and ingredients. Slow tactile camera push. No people, no hands, no faces, no new logos, no invented Arabic, no green-coated kernels.

## americano

Photoreal commercial product cinematography of an approved HUBB Americano matte-black sunflower-seed pouch standing on warm AlUla sandstone. Dark espresso beans sit in low-key after-hours light. Golden-hour raking light from camera left, shallow depth of field, 85mm lens, physically accurate foil and matte pack materials, natural roasted striped sunflower seeds and golden kernels, espresso-brown color entering only through light and ingredients. Slow tactile camera push. No people, no hands, no faces, no new logos, no invented Arabic, no green-coated kernels.

## seven-worlds

Photoreal seven-chapter commercial film of HUBB sunflower-seed pouches. Each chapter holds one real matte-black pack in its flavor world, slow cinematic push, physically accurate materials, golden Saudi light, natural roasted kernels. No people, no hands, no fake Arabic, no green-coated Matcha kernels.
