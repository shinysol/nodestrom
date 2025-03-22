## 커스텀 Date Format 유틸

### format

- arguments

  - formatString: string

- elements

  - YYYY: year
  - MM: month
  - DD: day
  - HH: hour
  - MM: minutes
  - SS: seconds
  - SSS: miliseconds

- example

```js
new Date().format('YYYY-MM-DD'); // 2023-10-10
new Date().format('YYYY-MM-DD HH:MM:SS'); // 2023-10-10 12:10:02
```

### formatPreset

- arguments

  - formatString: 'YMD' | 'YMDHMS' | 'YMDHMSS',
  - separator?: string = '-'

- formatString enums

  - YMD: year, month, date
  - YMDHMS: year, month, date, hours, minutes, seconds
  - YMDHMSS: year, month, date, hours, minutes, seconds, miliseconds

- example

```js
new Date().formatPreset('YMD'); // 2023-10-10
new Date().formatPreset('YMD', '/'); // 2023/10/10
new Date().formatPreset('YMDHMS'); // 2023-10-10 12:10:02
new Date().formatPreset('YMDHMSS'); // 2023-10-10 12:10:02.125
```


### 폴더 구조

```
@types
  └─ date-format.util.ts // 타입정의
...
src
  └─ utils
    └─ date
      └─ date-format.util.ts // date-format 펑션 정의
```
